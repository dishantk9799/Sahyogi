import { Link } from "react-router-dom";
import Avatar from "../../../shared/components/Avatar";
import Badge from "../../../shared/components/Badge";
import Card, { CardContent } from "../../../shared/components/Card";
import Icon from "../../../shared/components/Icon";
import { formatDate } from "../../../shared/utils/formatters";

function BlogCard({ blog, actions, compact = false }) {
    const author = blog.authorId;
    const tags = Array.isArray(blog.tags)
        ? blog.tags
        : String(blog.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean);

    return (
        <Card className="h-full overflow-hidden transition hover:-translate-y-0.5 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-950/20">
            {!compact && (blog.coverImage ? (
                <Link to={`/blogs/${blog.slug}`} className="block aspect-video overflow-hidden">
                    <img src={blog.coverImage} alt={blog.title} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
                </Link>
            ) : (
                <Link to={`/blogs/${blog.slug}`} className="flex aspect-video items-center justify-center bg-gradient-to-br from-orange-950/30 to-amber-950/30">
                    <Icon name="file" className="h-12 w-12 text-orange-400" />
                </Link>
            ))}

            <CardContent className={compact ? "grid gap-3 p-3" : "grid gap-4"}>
                <div>
                    <Link to={`/blogs/${blog.slug}`} className={`${compact ? "text-sm" : "text-base"} line-clamp-2 font-semibold hover:text-orange-300`}>
                        {blog.title}
                    </Link>
                    {!compact && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{blog.content}</p>}
                </div>

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {tags.slice(0, compact ? 2 : 3).map((tag) => (
                            <Badge key={tag} tone="orange">{tag}</Badge>
                        ))}
                        {tags.length > (compact ? 2 : 3) && <Badge tone="orange">+{tags.length - (compact ? 2 : 3)}</Badge>}
                    </div>
                )}

                <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                    {author?.username ? (
                        <Link to={`/profile/${author.username}`} className="flex min-w-0 items-center gap-2 hover:text-foreground">
                            <Avatar src={author.profileImage} name={author.name} className="h-6 w-6 text-xs" />
                            <span className="truncate">{author.name || `@${author.username}`}</span>
                        </Link>
                    ) : <span>Blog</span>}
                    {!compact && <span className="shrink-0">{formatDate(blog.createdAt)}</span>}
                </div>

                {actions}
            </CardContent>
        </Card>
    );
}

export default BlogCard;
