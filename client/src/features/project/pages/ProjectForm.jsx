import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import Card, { CardContent } from "../../../shared/components/Card";
import Icon from "../../../shared/components/Icon";
import Input from "../../../shared/components/Input";
import Textarea from "../../../shared/components/Textarea";
import { getApiMessage, toFormData } from "../../../shared/utils/formatters";
import { createProject } from "../api/project.api";

function ProjectForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveLink: "",
        thumbnail: null
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
            const response = await createProject(toFormData(form));
            toast.success("Project created");
            navigate(`/projects/${response.data.data._id}`);
        } catch (error) {
            toast.error(getApiMessage(error, "Project creation failed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mx-auto grid max-w-2xl gap-6">
            <div>
                <h1 className="text-3xl font-bold">New <span className="gradient-text">Project</span></h1>
                <p className="mt-2 text-sm text-muted-foreground">Add a project with links and a Cloudinary thumbnail upload.</p>
            </div>

            <Card>
                <CardContent>
                    <form className="grid gap-4" onSubmit={handleSubmit}>
                        <Input label="Title" name="title" value={form.title} onChange={handleChange} placeholder="My Awesome Project" required />
                        <Textarea label="Description" name="description" value={form.description} onChange={handleChange} placeholder="Describe what your project does..." />
                        <Input label="Tech stack" name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node, MongoDB" />
                        <Input label="GitHub link" name="githubLink" value={form.githubLink} onChange={handleChange} placeholder="https://github.com/username/repo" />
                        <Input label="Live link" name="liveLink" value={form.liveLink} onChange={handleChange} placeholder="https://myproject.vercel.app" />
                        <Input label="Thumbnail" name="thumbnail" type="file" accept="image/*" onChange={handleChange} />
                        <Button type="submit" disabled={loading}>{loading ? "Creating..." : <><Icon name="plus" />Create project</>}</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}

export default ProjectForm;
