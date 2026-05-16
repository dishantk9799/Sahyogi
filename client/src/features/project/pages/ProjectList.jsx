import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Badge from "../../../shared/components/Badge";
import Button from "../../../shared/components/Button";
import EmptyState from "../../../shared/components/EmptyState";
import Icon from "../../../shared/components/Icon";
import Loader from "../../../shared/components/Loader";
import { getApiData, getApiMessage } from "../../../shared/utils/formatters";
import { useAuth } from "../../auth/hooks/useAuth";
import ProjectCard from "../components/ProjectCard";
import { getAllProjects, toggleProjectLike, toggleProjectSave } from "../api/project.api";

function ProjectList() {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeTech, setActiveTech] = useState("");
    const [liked, setLiked] = useState({});
    const [saved, setSaved] = useState({});

    useEffect(() => {
        getAllProjects()
            .then((response) => {
                const projectData = getApiData(response || []);
                setProjects(projectData);
                const likedState = {};
                const savedState = {};
                projectData.forEach(project => {
                    likedState[project._id] = project.likes?.includes(user?._id);
                    savedState[project._id] = project.savedBy?.includes(user?._id);
                });
                setLiked(likedState);
                setSaved(savedState);
            })
            .catch((error) =>
                toast.error(getApiMessage(error, "Could not load projects"))
            )
            .finally(() => setLoading(false));
    }, [user]);

    const handleAction = async (action, id, success, failed) => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        try {
            await action(id);
            if (action === toggleProjectLike) {
                setLiked((prev) => {
                    const newLiked = { ...prev, [id]: !prev[id] };
                    newLiked[id] ? toast.success(success) : toast.error(failed);
                    return newLiked;
                });
                return;
            }
            if (action === toggleProjectSave) {
                setSaved((prev) => {
                    const newSaved = { ...prev, [id]: !prev[id] };
                    newSaved[id] ? toast.success(success) : toast.error(failed);
                    return newSaved;
                });
                return;
            }
        } catch (error) {
            toast.error(getApiMessage(error));
        }
    };

    const techFilters = ["React", "JavaScript", "Node", "MongoDB", "Express", "Vite", "Python"];
    const filteredProjects = projects.filter((project) => {
        const haystack = `${project.title || ""} ${project.description || ""} ${(project.techStack || []).join(" ")}`.toLowerCase();
        const matchesSearch = !search || haystack.includes(search.toLowerCase());
        const matchesTech = !activeTech || (project.techStack || []).some((tech) => tech.toLowerCase().includes(activeTech.toLowerCase()));
        return matchesSearch && matchesTech;
    });

    if (loading) return <Loader label="Loading projects..." />;

    return (
        <section className="mx-auto grid max-w-6xl gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Explore <span className="gradient-text">Projects</span></h1>
                    <p className="mt-2 text-sm text-muted-foreground">Discover amazing developer projects.</p>
                </div>
                {user && (
                    <Link to="/projects/new" className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700">
                        <Icon name="plus" />
                        New project
                    </Link>
                )}
            </div>

            <div className="grid gap-4">
                <div className="relative">
                    <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search projects by title, description, or tech..."
                        className="h-11 w-full rounded-md border border-border bg-white/5 pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Icon name="filter" className="h-3.5 w-3.5" />Filter:
                    </span>
                    {techFilters.map((tech) => (
                        <button key={tech} type="button" onClick={() => setActiveTech((current) => current === tech ? "" : tech)}>
                            <Badge active={activeTech === tech}>{tech}</Badge>
                        </button>
                    ))}
                    {(search || activeTech) && (
                        <button type="button" onClick={() => { setSearch(""); setActiveTech(""); }}>
                            <Badge className="border-red-500/40 text-red-300"><Icon name="close" className="mr-1 h-3 w-3" />Clear</Badge>
                        </button>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">{filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"} found</p>
            </div>

            {filteredProjects.length === 0 ? (
                <EmptyState title="No projects yet" description="Create the first project when you are ready." />
            ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            actions={(
                                <div className="flex gap-2">
                                    <Button type="button" variant="secondary" onClick={() => handleAction(toggleProjectLike, project._id, "Liked", "Unliked")}>
                                        <Icon name="heart" className={`h-5 w-5 ${liked[project._id] ? "fill-red-500 text-red-500" : "fill-none text-red-500"}`} />
                                    </Button>
                                    <Button type="button" variant="ghost" onClick={() => handleAction(toggleProjectSave, project._id, "Saved", "Unsaved")}>
                                        {saved[project._id] ? "Saved" : "Save"}
                                    </Button>
                                </div>
                            )}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default ProjectList;
