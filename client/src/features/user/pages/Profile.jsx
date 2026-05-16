import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../../shared/components/Avatar";
import Badge from "../../../shared/components/Badge";
import Button from "../../../shared/components/Button";
import Card, { CardContent } from "../../../shared/components/Card";
import Icon from "../../../shared/components/Icon";
import Loader from "../../../shared/components/Loader";
import { getApiData, getApiMessage } from "../../../shared/utils/formatters";
import { useAuth } from "../../auth/hooks/useAuth";
import { getAllBlogs } from "../../blog/api/blog.api";
import BlogCard from "../../blog/components/BlogCard";
import { getAllProjects } from "../../project/api/project.api";
import ProjectCard from "../../project/components/ProjectCard";
import { getProfile, toggleFollow } from "../api/user.api";

function Profile() {
    const { username } = useParams();
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [activeTab, setActiveTab] = useState("projects");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getProfile(username)
            .then(async (response) => {
                const nextProfile = getApiData(response);
                setProfile(nextProfile);

                const [projectsResponse, blogsResponse] = await Promise.all([getAllProjects(), getAllBlogs()]);
                setProjects((getApiData(projectsResponse) || []).filter((project) => project.userId?._id === nextProfile._id));
                setBlogs((getApiData(blogsResponse) || []).filter((blog) => blog.authorId?._id === nextProfile._id));
            })
            .catch((error) => toast.error(getApiMessage(error, "Could not load profile")))
            .finally(() => setLoading(false));
    }, [username]);

    const handleFollow = async () => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        try {
            const response = await toggleFollow(profile._id);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(getApiMessage(error));
        }
    };

    if (loading) return <Loader label="Loading profile..." />;
    if (!profile) return null;

    const isOwnProfile = user?._id === profile._id;
    const skills = Array.isArray(profile.skills)
        ? profile.skills
        : String(profile.skills || "").split(",").map((skill) => skill.trim()).filter(Boolean);

    return (
        <section className="mx-auto grid max-w-5xl gap-6">
            <Card className="overflow-hidden">
                <div className="h-52 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">
                    {profile.bannerImage && <img src={profile.bannerImage} alt="" className="h-full w-full object-cover" />}
                </div>

                <CardContent className="grid gap-5">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div className="flex items-end gap-4">
                            <Avatar src={profile.profileImage} name={profile.name} className="-mt-16 h-32 w-32 border-4 border-background text-4xl shadow-lg" />
                            <div>
                                <h1 className="text-3xl font-bold">{profile.name}</h1>
                                <p className="text-sm text-muted-foreground">@{profile.username}</p>
                            </div>
                        </div>

                        {isOwnProfile ? (
                            <Link to="/profile/edit" className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-white/5 px-4 text-sm font-medium hover:bg-white/10">
                                <Icon name="edit" />
                                Edit profile
                            </Link>
                        ) : (
                            <Button type="button" onClick={handleFollow}><Icon name="users" />Follow</Button>
                        )}
                    </div>

                    {profile.bio && <p className="max-w-2xl text-muted-foreground">{profile.bio}</p>}

                    {skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <Badge key={skill}>{skill}</Badge>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3 text-sm">
                        {profile.github && <a className="inline-flex items-center gap-2 font-medium text-emerald-300 underline" href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" />GitHub</a>}
                        {profile.linkedin && <a className="font-medium text-emerald-300 underline" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                        {profile.twitter && <a className="font-medium text-emerald-300 underline" href={profile.twitter} target="_blank" rel="noreferrer">Twitter</a>}
                        {profile.portfolio && <a className="inline-flex items-center gap-2 font-medium text-emerald-300 underline" href={profile.portfolio} target="_blank" rel="noreferrer"><Icon name="globe" />Portfolio</a>}
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-2">
                <button type="button" onClick={() => setActiveTab("projects")} className={`inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium ${activeTab === "projects" ? "bg-emerald-600 text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>
                    <Icon name="folder" />Projects
                </button>
                <button type="button" onClick={() => setActiveTab("blogs")} className={`inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium ${activeTab === "blogs" ? "bg-emerald-600 text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>
                    <Icon name="file" />Blogs
                </button>
            </div>

            {activeTab === "projects" ? (
                projects.length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-2">{projects.map((project) => <ProjectCard key={project._id} project={project} />)}</div>
                ) : (
                    <div className="py-12 text-center text-muted-foreground">No projects yet</div>
                )
            ) : blogs.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2">{blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}</div>
            ) : (
                <div className="py-12 text-center text-muted-foreground">No blogs yet</div>
            )}
        </section>
    );
}

export default Profile;
