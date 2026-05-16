import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import Card, { CardContent } from "../../../shared/components/Card";
import Icon from "../../../shared/components/Icon";
import Input from "../../../shared/components/Input";
import Textarea from "../../../shared/components/Textarea";
import { getApiMessage, toFormData } from "../../../shared/utils/formatters";
import { useAuth } from "../../auth/hooks/useAuth";
import { updateProfile } from "../api/user.api";

function EditProfile() {
    const { user, refreshUser } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: user?.name || "",
        username: user?.username || "",
        bio: user?.bio || "",
        skills: user?.skills?.join(", ") || "",
        github: user?.github || "",
        linkedin: user?.linkedin || "",
        twitter: user?.twitter || "",
        portfolio: user?.portfolio || "",
        profileImage: null,
        bannerImage: null
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setForm((current) => ({
            ...current,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await updateProfile(toFormData(form));
            await refreshUser();
            toast.success("Profile updated");
            navigate(`/profile/${form.username}`);
        } catch (error) {
            toast.error(getApiMessage(error, "Profile update failed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mx-auto grid max-w-2xl gap-6">
            <div>
                <h1 className="text-3xl font-bold">Edit <span className="gradient-text">Profile</span></h1>
                <p className="mt-2 text-sm text-muted-foreground">Update your public details and Cloudinary images.</p>
            </div>

            <Card>
                <CardContent>
                    <form className="grid gap-4" onSubmit={handleSubmit}>
                        <Input label="Name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                        <Input label="Username" name="username" value={form.username} onChange={handleChange} placeholder="johndoe" />
                        <Textarea label="Bio" name="bio" value={form.bio} onChange={handleChange} placeholder="Tell us about yourself..." />
                        <Input label="Skills" name="skills" value={form.skills} onChange={handleChange} placeholder="React, Express, MongoDB" />
                        <Input label="GitHub" name="github" value={form.github} onChange={handleChange} placeholder="https://github.com/username" />
                        <Input label="LinkedIn" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
                        <Input label="Twitter" name="twitter" value={form.twitter} onChange={handleChange} placeholder="https://twitter.com/username" />
                        <Input label="Portfolio" name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://myportfolio.com" />
                        <Input label="Profile image" name="profileImage" type="file" accept="image/*" onChange={handleChange} />
                        <Input label="Banner image" name="bannerImage" type="file" accept="image/*" onChange={handleChange} />
                        <Button type="submit" disabled={loading}>{loading ? "Saving..." : <><Icon name="settings" />Save profile</>}</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}

export default EditProfile;
