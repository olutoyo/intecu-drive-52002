import { FileText, Image, Video, FileArchive, Music, File, MoreVertical, Download, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface FileItem {
  id: string;
  name: string;
  type: "document" | "image" | "video" | "archive" | "audio" | "other";
  size: string;
  modified: string;
  starred?: boolean;
}

interface FileCardProps {
  file: FileItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDownload: (file: FileItem) => void;
}

const fileIcons = {
  document: FileText,
  image: Image,
  video: Video,
  archive: FileArchive,
  audio: Music,
  other: File,
};

const fileColors = {
  document: "text-blue-500",
  image: "text-green-500",
  video: "text-purple-500",
  archive: "text-orange-500",
  audio: "text-pink-500",
  other: "text-gray-500",
};

export const FileCard = ({ file, isSelected, onSelect, onDownload }: FileCardProps) => {
  const Icon = fileIcons[file.type];
  const colorClass = fileColors[file.type];

  return (
    <Card
      className={cn(
        "group relative p-4 cursor-pointer transition-all duration-200 hover:shadow-card-hover animate-fade-in",
        isSelected && "ring-2 ring-primary shadow-card-hover"
      )}
      onClick={() => onSelect(file.id)}
    >
      <div className="absolute top-3 left-3 z-10" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(file.id)}
          className="data-[state=checked]:bg-primary"
        />
      </div>

      <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDownload(file)}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Star className="mr-2 h-4 w-4" />
              {file.starred ? "Unstar" : "Star"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col items-center gap-3 pt-8">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center shadow-sm">
          <Icon className={cn("w-8 h-8", colorClass)} />
        </div>
        
        <div className="text-center w-full space-y-1">
          <p className="font-medium text-sm truncate">{file.name}</p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>{file.size}</span>
            <span>•</span>
            <span>{file.modified}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
