"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getApiErrorMessage } from "@/services/api";
import { createPublication, getMyPublications, updatePublication } from "@/services/publications";
import { uploadImage } from "@/services/uploads";
import { getCurrentUser, updateProfile } from "@/services/users";
import { profileSettingsSchema, publicationSettingsSchema } from "@/validations/settings";

const emptyProfile = {
  fullName: "",
  bio: "",
  avatarUrl: "",
  bannerUrl: "",
  socials: {
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
  },
};

const emptyPublication = {
  name: "",
  slug: "",
  description: "",
  tagline: "",
  logoUrl: "",
  coverUrl: "",
  accentColor: "#111827",
};

function profileValues(user) {
  return {
    fullName: user?.fullName ?? "",
    bio: user?.bio ?? "",
    avatarUrl: user?.avatarUrl ?? "",
    bannerUrl: user?.bannerUrl ?? "",
    socials: {
      website: user?.socials?.website ?? "",
      github: user?.socials?.github ?? "",
      linkedin: user?.socials?.linkedin ?? "",
      twitter: user?.socials?.twitter ?? "",
    },
  };
}

function publicationValues(publication) {
  if (!publication) {
    return emptyPublication;
  }

  return {
    name: publication.name ?? "",
    slug: publication.slug ?? "",
    description: publication.description ?? "",
    tagline: publication.tagline ?? "",
    logoUrl: publication.logoUrl ?? "",
    coverUrl: publication.coverUrl ?? "",
    accentColor: publication.accentColor ?? "#111827",
  };
}

function FieldError({ error }) {
  return error ? <p className="text-xs text-destructive">{error.message}</p> : null;
}

export function SettingsManagement() {
  const [publications, setPublications] = useState([]);
  const [selectedPublicationId, setSelectedPublicationId] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [uploadingField, setUploadingField] = useState("");

  const profileForm = useForm({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: emptyProfile,
  });
  const publicationForm = useForm({
    resolver: zodResolver(publicationSettingsSchema),
    defaultValues: emptyPublication,
  });

  const selectedPublication = useMemo(
    () => publications.find((publication) => publication.id === selectedPublicationId),
    [publications, selectedPublicationId],
  );

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      try {
        const [user, nextPublications] = await Promise.all([getCurrentUser(), getMyPublications()]);

        if (mounted) {
          setPublications(nextPublications);
          setSelectedPublicationId(nextPublications[0]?.id ?? "");
          profileForm.reset(profileValues(user));
          publicationForm.reset(publicationValues(nextPublications[0]));
          setLoadError("");
        }
      } catch (requestError) {
        if (mounted) {
          setLoadError(getApiErrorMessage(requestError, "Settings could not be loaded"));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      mounted = false;
    };
  }, [profileForm, publicationForm]);

  useEffect(() => {
    publicationForm.reset(publicationValues(selectedPublication));
  }, [publicationForm, selectedPublication]);

  async function saveProfile(values) {
    try {
      const updatedUser = await updateProfile(values);
      profileForm.reset(profileValues(updatedUser));
      toast.success("Profile settings saved");
    } catch (requestError) {
      toast.error(getApiErrorMessage(requestError, "Profile settings could not be saved"));
    }
  }

  async function savePublication(values) {
    try {
      const savedPublication = selectedPublication
        ? await updatePublication(selectedPublication.id, values)
        : await createPublication(values);

      setPublications((currentPublications) => {
        if (selectedPublication) {
          return currentPublications.map((publication) =>
            publication.id === savedPublication.id ? savedPublication : publication,
          );
        }

        return [savedPublication, ...currentPublications];
      });
      setSelectedPublicationId(savedPublication.id);
      publicationForm.reset(publicationValues(savedPublication));
      toast.success(selectedPublication ? "Publication settings saved" : "Publication created");
    } catch (requestError) {
      toast.error(getApiErrorMessage(requestError, "Publication settings could not be saved"));
    }
  }

  async function uploadProfileImage(field, event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploadingField(field);

    try {
      const image = await uploadImage(file);
      profileForm.setValue(field, image.url, { shouldDirty: true, shouldValidate: true });
      toast.success("Image uploaded");
    } catch (requestError) {
      toast.error(getApiErrorMessage(requestError, "Image could not be uploaded"));
    } finally {
      setUploadingField("");
      event.target.value = "";
    }
  }

  async function uploadPublicationImage(field, event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploadingField(field);

    try {
      const image = await uploadImage(file);
      publicationForm.setValue(field, image.url, { shouldDirty: true, shouldValidate: true });
      toast.success("Image uploaded");
    } catch (requestError) {
      toast.error(getApiErrorMessage(requestError, "Image could not be uploaded"));
    } finally {
      setUploadingField("");
      event.target.value = "";
    }
  }

  return (
    <>
      <h1 className="text-3xl font-semibold">Settings</h1>

      {loading ? <p className="mt-6 text-sm text-muted-foreground">Loading settings...</p> : null}
      {loadError ? <p className="mt-6 text-sm text-destructive">{loadError}</p> : null}

      {!loading && !loadError ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Writer profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={profileForm.handleSubmit(saveProfile)}>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Name</Label>
                  <Input id="fullName" {...profileForm.register("fullName")} />
                  <FieldError error={profileForm.formState.errors.fullName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" {...profileForm.register("bio")} />
                  <FieldError error={profileForm.formState.errors.bio} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatarUrl">Avatar URL</Label>
                  <Input
                    id="avatarUrl"
                    placeholder="https://..."
                    {...profileForm.register("avatarUrl")}
                  />
                  <Input
                    id="avatarFile"
                    type="file"
                    accept="image/*"
                    disabled={Boolean(uploadingField)}
                    onChange={(event) => uploadProfileImage("avatarUrl", event)}
                  />
                  {uploadingField === "avatarUrl" ? (
                    <p className="text-xs text-muted-foreground">Uploading avatar...</p>
                  ) : null}
                  <FieldError error={profileForm.formState.errors.avatarUrl} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bannerUrl">Banner URL</Label>
                  <Input
                    id="bannerUrl"
                    placeholder="https://..."
                    {...profileForm.register("bannerUrl")}
                  />
                  <Input
                    id="bannerFile"
                    type="file"
                    accept="image/*"
                    disabled={Boolean(uploadingField)}
                    onChange={(event) => uploadProfileImage("bannerUrl", event)}
                  />
                  {uploadingField === "bannerUrl" ? (
                    <p className="text-xs text-muted-foreground">Uploading banner...</p>
                  ) : null}
                  <FieldError error={profileForm.formState.errors.bannerUrl} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://..."
                      {...profileForm.register("socials.website")}
                    />
                    <FieldError error={profileForm.formState.errors.socials?.website} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      placeholder="https://..."
                      {...profileForm.register("socials.github")}
                    />
                    <FieldError error={profileForm.formState.errors.socials?.github} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      placeholder="https://..."
                      {...profileForm.register("socials.linkedin")}
                    />
                    <FieldError error={profileForm.formState.errors.socials?.linkedin} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter/X</Label>
                    <Input
                      id="twitter"
                      placeholder="https://..."
                      {...profileForm.register("socials.twitter")}
                    />
                    <FieldError error={profileForm.formState.errors.socials?.twitter} />
                  </div>
                </div>
                <Button className="w-fit" disabled={profileForm.formState.isSubmitting}>
                  <Save className="size-4" />
                  {profileForm.formState.isSubmitting ? "Saving..." : "Save profile"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publication</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={publicationForm.handleSubmit(savePublication)}>
                {publications.length ? (
                  <div className="space-y-2">
                    <Label htmlFor="publication">Active publication</Label>
                    <select
                      id="publication"
                      value={selectedPublicationId}
                      onChange={(event) => setSelectedPublicationId(event.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {publications.map((publication) => (
                        <option key={publication.id} value={publication.id}>
                          {publication.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
                <div className="space-y-2">
                  <Label htmlFor="publication-name">Publication name</Label>
                  <Input id="publication-name" {...publicationForm.register("name")} />
                  <FieldError error={publicationForm.formState.errors.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" {...publicationForm.register("slug")} />
                  <FieldError error={publicationForm.formState.errors.slug} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Textarea id="tagline" {...publicationForm.register("tagline")} />
                  <FieldError error={publicationForm.formState.errors.tagline} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" {...publicationForm.register("description")} />
                  <FieldError error={publicationForm.formState.errors.description} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      placeholder="https://..."
                      {...publicationForm.register("logoUrl")}
                    />
                    <Input
                      id="logoFile"
                      type="file"
                      accept="image/*"
                      disabled={Boolean(uploadingField)}
                      onChange={(event) => uploadPublicationImage("logoUrl", event)}
                    />
                    {uploadingField === "logoUrl" ? (
                      <p className="text-xs text-muted-foreground">Uploading logo...</p>
                    ) : null}
                    <FieldError error={publicationForm.formState.errors.logoUrl} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverUrl">Cover URL</Label>
                    <Input
                      id="coverUrl"
                      placeholder="https://..."
                      {...publicationForm.register("coverUrl")}
                    />
                    <Input
                      id="publicationCoverFile"
                      type="file"
                      accept="image/*"
                      disabled={Boolean(uploadingField)}
                      onChange={(event) => uploadPublicationImage("coverUrl", event)}
                    />
                    {uploadingField === "coverUrl" ? (
                      <p className="text-xs text-muted-foreground">Uploading cover...</p>
                    ) : null}
                    <FieldError error={publicationForm.formState.errors.coverUrl} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent color</Label>
                  <Input
                    id="accentColor"
                    type="color"
                    {...publicationForm.register("accentColor")}
                  />
                  <FieldError error={publicationForm.formState.errors.accentColor} />
                </div>
                <Button className="w-fit" disabled={publicationForm.formState.isSubmitting}>
                  <Save className="size-4" />
                  {publicationForm.formState.isSubmitting
                    ? "Saving..."
                    : selectedPublication
                      ? "Save publication"
                      : "Create publication"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </>
  );
}
