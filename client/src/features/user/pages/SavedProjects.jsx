import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "../../../shared/components/EmptyState";
import Icon from "../../../shared/components/Icon";
import Loader from "../../../shared/components/Loader";
import { getApiData, getApiMessage } from "../../../shared/utils/formatters";
import ProjectCard from "../../project/components/ProjectCard";
import { getSavedProjects } from "../api/user.api";

function SavedProjects() {
    const [savedProjects, setSavedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSavedProjects()
            .then((response) => setSavedProjects(getApiData(response) || []))
            .catch((error) => toast.error(getApiMessage(error, "Could not load saved projects")))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loader label="Loading saved projects..." />;

    return (
        <section className="grid gap-6">
            <div>
                <h1 className="flex items-center gap-2 text-3xl font-bold"><Icon name="bookmark" className="h-7 w-7 text-emerald-400" />Saved <span className="gradient-text">Projects</span></h1>
                <p className="mt-2 text-sm text-muted-foreground">Projects you saved for later.</p>
            </div>

            {savedProjects.length === 0 ? (
                <EmptyState title="Nothing saved yet" description="Saved projects will appear here." />
            ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {savedProjects.map((saved) => (
                        <ProjectCard key={saved._id} project={saved.projectId} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default SavedProjects;
