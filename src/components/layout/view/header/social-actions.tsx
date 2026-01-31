import { Button } from "@/components/ui/global/button";
import { Github, Mail, Linkedin, Check } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface SocialActionsProps {
    copied: boolean;
    onCopyEmail: () => void;
}

export function SocialActions({ copied, onCopyEmail }: SocialActionsProps) {
    return (
        <div className="hidden md:flex items-center gap-1 -mr-2">
            <SocialButton href={SITE_CONFIG.links.github} icon={<Github className="h-5 w-5" />} label="GitHub" />
            <SocialButton href={SITE_CONFIG.links.linkedin} icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />

            <Button
                variant="ghost"
                size="icon"
                onClick={onCopyEmail}
                className="text-slate-950 dark:text-white group w-auto px-2 justify-start overflow-hidden transition-all duration-300"
            >
                <div className="flex items-center">
                    <div className="shrink-0">
                        {copied ? <Check className="h-5 w-5 text-green-500" /> : <Mail className="h-5 w-5" />}
                    </div>
                    <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] group-hover:ml-2 transition-all duration-300 text-sm font-medium whitespace-nowrap">
                        {copied ? "Copied!" : SITE_CONFIG.email}
                    </span>
                </div>
            </Button>
        </div>
    );
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Button variant="ghost" size="icon" asChild className="text-slate-950 dark:text-white group w-auto px-2 justify-start overflow-hidden transition-all duration-300">
            <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <div className="shrink-0">{icon}</div>
                <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 text-sm font-medium whitespace-nowrap">
                    {label}
                </span>
            </a>
        </Button>
    );
}