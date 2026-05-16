import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import Card, { CardContent } from "../../../shared/components/Card";
import Icon from "../../../shared/components/Icon";
import Input from "../../../shared/components/Input";
import Textarea from "../../../shared/components/Textarea";
import { getApiMessage, toFormData } from "../../../shared/utils/formatters";
import { createBlog } from "../api/blog.api";

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

function BlogForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        slug: "",
        content: "",
        tags: "",
        coverImage: null
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setForm((current) => {
            const next = {
                ...current,
                [name]: files ? files[0] : value
            };

            if (name === "title" && !current.slug) {
                next.slug = slugify(value);
            }

            return next;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await createBlog(toFormData(form));
            toast.success("Blog created");
            navigate(`/blogs/${response.data.data.slug}`);
        } catch (error) {
            toast.error(getApiMessage(error, "Blog creation failed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mx-auto grid max-w-2xl gap-6">
            <div>
                <h1 className="text-3xl font-bold">New <span className="gradient-text">Blog</span></h1>
                <p className="mt-2 text-sm text-muted-foreground">Publish a post with tags and a Cloudinary cover upload.</p>
            </div>

            <Card>
                <CardContent>
                    <form className="grid gap-4" onSubmit={handleSubmit}>
                        <Input label="Title" name="title" value={form.title} onChange={handleChange} placeholder="My Awesome Blog Post" required />
<Input label="Slug" name="slug" value={form.slug} onChange={handleChange} placeholder="my-awesome-blog-post" required />
<Textarea label="Content" name="content" value={form.content} onChange={handleChange} placeholder="Write your blog content here..." required />
<Input label="Tags" name="tags" value={form.tags} onChange={handleChange} placeholder="React, MERN, Design" />
<Input label="Cover image" name="coverImage" type="file" accept="image/*" onChange={handleChange} />
                        <Button type="submit" disabled={loading}>{loading ? "Publishing..." : <><Icon name="plus" />Publish blog</>}</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}

export default BlogForm;
