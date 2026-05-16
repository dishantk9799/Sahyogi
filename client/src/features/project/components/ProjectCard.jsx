import { Link } from "react-router-dom";
import Avatar from "../../../shared/components/Avatar";
import Badge from "../../../shared/components/Badge";
import Card, { CardContent } from "../../../shared/components/Card";
import Icon from "../../../shared/components/Icon";
import { formatDate } from "../../../shared/utils/formatters";

function ProjectCard({ project, actions, compact = false }) {
    const author = project.userId;
    const techStack = Array.isArray(project.techStack)
        ? project.techStack
        : String(project.techStack || "").split(",").map((tech) => tech.trim()).filter(Boolean);

    return (
        <Card className="h-full overflow-hidden transition hover:-translate-y-0.5 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-950/20">
            {!compact && (project.thumbnail ? (
                <Link to={`/projects/${project._id}`} className="block aspect-video overflow-hidden">
                    <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
                </Link>
            ) : (
                <Link to={`/projects/${project._id}`} className="flex aspect-video items-center justify-center bg-gradient-to-br from-emerald-950/40 to-teal-950/30">
                    <Icon name="folder" className="h-12 w-12 text-emerald-400" />
                </Link>
            ))}

            <CardContent className={compact ? "grid gap-3 p-3" : "grid gap-4"}>
                <div>
                    <Link to={`/projects/${project._id}`} className={`${compact ? "text-sm" : "text-base"} line-clamp-1 font-semibold hover:text-emerald-300`}>
                        {project.title}
                    </Link>
                    {!compact && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>}
                </div>

                {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {techStack.slice(0, compact ? 2 : 4).map((tech) => (
                            <Badge key={tech}>{tech}</Badge>
                        ))}
                        {techStack.length > (compact ? 2 : 4) && <Badge>+{techStack.length - (compact ? 2 : 4)}</Badge>}
                    </div>
                )}

                <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                    {author?.username ? (
                        <Link to={`/profile/${author.username}`} className="flex min-w-0 items-center gap-2 hover:text-foreground">
                            <Avatar src={author.profileImage} name={author.name} className="h-6 w-6 text-xs" />
                            <span className="truncate">{author.name || `@${author.username}`}</span>
                        </Link>
                    ) : <span>Project</span>}
                    {!compact && <span className="shrink-0">{formatDate(project.createdAt)}</span>}
                </div>

                {actions}
            </CardContent>
        </Card>
    );
}

export default ProjectCard;
