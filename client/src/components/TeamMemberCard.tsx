import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

// Definimos la interfaz para los miembros del equipo
interface TeamMember {
  name: string;
  role: string;
  email: string;
  avatarSrc?: string;
}

// Definimos la interfaz para los props del componente, que ahora incluye un array de miembros
interface TeamMemberCardProps {
  members: TeamMember[];
  title: string;
  description: string;
}

function TeamMemberCard({ members, title, description }: TeamMemberCardProps) {
  return (
    <Card className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <CardContent className="p-6 pt-0 grid gap-6">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
              <Avatar className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <AvatarImage src={member.avatarSrc} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {member.name}
                </p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>
            <Button className="text-slate-600  transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground  px-4 py-2 ml-auto">
              {member.role}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default TeamMemberCard;
