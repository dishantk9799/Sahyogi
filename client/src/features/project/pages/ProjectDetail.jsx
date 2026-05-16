import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Badge from "../../../shared/components/Badge";
import Button from "../../../shared/components/Button";
import Card, { CardContent } from "../../../shared/components/Card";
import Icon from "../../../shared/components/Icon";
import Loader from "../../../shared/components/Loader";
import { getApiData, getApiMessage } from "../../../shared/utils/formatters";
import { useAuth } from "../../auth/hooks/useAuth";
import { getProjectById, toggleProjectLike, toggleProjectSave } from "../api/project.api";

function ProjectDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        getProjectById(id)
            .then((response) => {
                const projectData = getApiData(response);
                setProject(projectData);
                setLiked(projectData.likes?.includes(user?._id));
                setSaved(projectData.savedBy?.includes(user?._id));
            })
            .catch((error) =>
                toast.error(getApiMessage(error, "Could not load project"))
            )
            .finally(() => setLoading(false));
    }, [id]);

    const runAction = async (action, success, failed) => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        try {
            await action(project._id);
            if (action === toggleProjectLike) {
                const newLiked = !liked;
                setLiked(newLiked);
                newLiked ? toast.success(success) : toast.error(failed);
                return;
            }

            if (action === toggleProjectSave) {
                const newSaved = !saved;
                setSaved(newSaved);
                newSaved ? toast.success(success) : toast.error(failed);
                return;
            }
        } catch (error) {
            toast.error(getApiMessage(error));
        }
    };

    if (loading) return <Loader label="Loading project..." />;
    if (!project) return null;

    return (
        <article className="mx-auto grid max-w-5xl gap-6">
            {project.thumbnail ? (
                <img src={project.thumbnail} alt={project.title} className="max-h-[460px] w-full rounded-xl object-cover" />
            ) : (
                <div className="flex h-72 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-950/40 to-teal-950/30">
                    <Icon name="folder" className="h-16 w-16 text-emerald-400" />
                </div>
            )}

            <Card>
                <CardContent className="grid gap-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">{project.title}</h1>
                            {project.userId?.username && (
                                <Link to={`/profile/${project.userId.username}`} className="mt-2 inline-block text-sm text-muted-foreground hover:text-foreground">
                                    @{project.userId.username}
                                </Link>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button type="button" variant="secondary" onClick={() => runAction(toggleProjectLike, "Liked", "Unliked")}>
                                <Icon name="heart" className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : "fill-none text-red-500"}`} />
                            </Button>
                            <Button type="button" variant="ghost" onClick={() => runAction(toggleProjectSave, "Saved", "Unsaved")}>{saved ? "Saved" : "Save"}</Button>
                        </div>
                    </div>

                    <p className="whitespace-pre-wrap leading-7 text-muted-foreground">{project.description}</p>

                    {project.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <Badge key={tech}>{tech}</Badge>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                        {project.githubLink && <a className="inline-flex items-center gap-2 font-medium text-emerald-300 underline" href={project.githubLink} target="_blank" rel="noreferrer"><Icon name="github" />GitHub</a>}
                        {project.liveLink && <a className="inline-flex items-center gap-2 font-medium text-emerald-300 underline" href={project.liveLink} target="_blank" rel="noreferrer"><Icon name="external" />Live site</a>}
                    </div>
                </CardContent>
            </Card>
        </article>
    );
}

export default ProjectDetail;
