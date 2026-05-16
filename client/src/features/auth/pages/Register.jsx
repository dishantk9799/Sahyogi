import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../shared/components/Button";
import Card, { CardContent } from "../../../shared/components/Card";
import Icon from "../../../shared/components/Icon";
import Input from "../../../shared/components/Input";
import { getApiMessage } from "../../../shared/utils/formatters";
import { useAuth } from "../hooks/useAuth";

function Register() {
    const { register } = useAuth();
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        setForm((current) => ({
            ...current,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await register(form);
        } catch (error) {
            toast.error(getApiMessage(error, "Registration failed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[78vh] items-center justify-center px-4 py-12">
            <Card className="relative w-full max-w-md overflow-hidden border-border/50 bg-background/80">
                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-emerald-500/5 blur-3xl" />
                <CardContent className="relative z-10 grid gap-6 p-6">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10">
                            <Icon name="code" className="h-7 w-7 text-emerald-400" />
                        </div>
                        <h1 className="text-2xl font-bold">Join Sahyogi</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Create your developer account.</p>
                    </div>

                    <form className="grid gap-4" onSubmit={handleSubmit}>
                        <Input label="Name" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                        <Input label="Username" name="username" placeholder="johndoe" value={form.username} onChange={handleChange} required />
                        <Input label="Email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                        <div className="relative">
                            <Input
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-10.5 text-muted-foreground hover:text-foreground"
                            >
                                <Icon name={showPassword ? "eye" : "eyeOff"} className="h-4 w-4" />
                            </button>
                        </div>
                        <Button type="submit" disabled={loading} className="h-11">
                            {loading ? "Creating..." : "Create Account"}
                            {!loading && <Icon name="arrowRight" />}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Already registered? <Link className="font-medium text-emerald-400 underline-offset-4 hover:underline" to="/login">Sign in</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}


export default Register;
