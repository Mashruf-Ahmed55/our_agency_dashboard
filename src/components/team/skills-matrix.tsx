'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { teamMembers } from '@/lib/team-data';

// Define skill categories and skills
const skillCategories = [
  {
    name: 'Frontend',
    skills: ['React', 'Vue', 'Angular', 'CSS/SCSS', 'TypeScript', 'Next.js'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Python', 'Java', 'PHP', 'Ruby', '.NET'],
  },
  {
    name: 'Database',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
  },
  {
    name: 'Design',
    skills: ['UI Design', 'UX Design', 'Figma', 'Adobe XD', 'Photoshop'],
  },
  {
    name: 'DevOps',
    skills: ['Docker', 'AWS', 'CI/CD', 'Kubernetes', 'GCP'],
  },
];

// Create a flattened list of all skills
const allSkills = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({ category: category.name, name: skill }))
);

// Function to determine skill level
const getSkillLevel = (member: (typeof teamMembers)[0], skillName: string) => {
  if (!member.skills.includes(skillName)) return 0;

  // For this demo, we'll randomly assign skill levels
  const memberIndex = parseInt(member.id);
  const skillIndex = allSkills.findIndex((s) => s.name === skillName);

  // Generate a deterministic but seemingly random level based on member ID and skill
  const sum = memberIndex + skillIndex;
  if (sum % 7 === 0) return 3; // Expert
  if (sum % 3 === 0) return 2; // Intermediate
  return 1; // Beginner
};

const getLevelDisplay = (level: number) => {
  switch (level) {
    case 3:
      return (
        <div
          className="w-5 h-5 rounded-full bg-green-500 mx-auto"
          title="Expert"
        />
      );
    case 2:
      return (
        <div
          className="w-5 h-5 rounded-full bg-yellow-500 mx-auto"
          title="Intermediate"
        />
      );
    case 1:
      return (
        <div
          className="w-5 h-5 rounded-full bg-blue-500 mx-auto"
          title="Beginner"
        />
      );
    default:
      return (
        <div
          className="w-5 h-5 rounded-full bg-gray-200 mx-auto"
          title="No experience"
        />
      );
  }
};

export function SkillsMatrix() {
  return (
    <ScrollArea className="h-[600px]">
      <div className="w-max min-w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-card z-10">
                Team Member
              </TableHead>
              {skillCategories.map((category) => (
                <TableHead
                  key={category.name}
                  colSpan={category.skills.length}
                  className="text-center border-l border-border"
                >
                  {category.name}
                </TableHead>
              ))}
            </TableRow>
            <TableRow>
              <TableHead className="sticky left-0 bg-card z-10">Name</TableHead>
              {allSkills.map((skill) => (
                <TableHead
                  key={`${skill.category}-${skill.name}`}
                  className={`text-center text-xs font-medium border-l-0 ${
                    allSkills.findIndex(
                      (s) =>
                        s.name === skill.name && s.category === skill.category
                    ) === 0 ||
                    allSkills[
                      allSkills.findIndex(
                        (s) =>
                          s.name === skill.name && s.category === skill.category
                      ) - 1
                    ].category !== skill.category
                      ? 'border-l border-border'
                      : ''
                  }`}
                >
                  {skill.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="sticky left-0 bg-card z-10 font-medium">
                  {member.name}
                </TableCell>
                {allSkills.map((skill) => (
                  <TableCell
                    key={`${member.id}-${skill.category}-${skill.name}`}
                    className={`text-center p-2 ${
                      allSkills.findIndex(
                        (s) =>
                          s.name === skill.name && s.category === skill.category
                      ) === 0 ||
                      allSkills[
                        allSkills.findIndex(
                          (s) =>
                            s.name === skill.name &&
                            s.category === skill.category
                        ) - 1
                      ].category !== skill.category
                        ? 'border-l border-border'
                        : ''
                    }`}
                  >
                    {getLevelDisplay(getSkillLevel(member, skill.name))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
}
