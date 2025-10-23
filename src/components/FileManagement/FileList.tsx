import { FileText, Image, Video, FileArchive, Music, File, Download, MoreVertical, Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { FileItem } from "./FileCard";

interface FileListProps {
  files: FileItem[];
  selectedFiles: string[];
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

export const FileList = ({ files, selectedFiles, onSelect, onDownload }: FileListProps) => {
  return (
    <div className="space-y-2">
      {files.map((file) => {
        const Icon = fileIcons[file.type];
        const colorClass = fileColors[file.type];
        const isSelected = selectedFiles.includes(file.id);

        return (
          <div
            key={file.id}
            className={cn(
              "flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-card transition-all duration-200 cursor-pointer animate-fade-in",
              isSelected && "ring-2 ring-primary shadow-card-hover"
            )}
            onClick={() => onSelect(file.id)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onSelect(file.id)}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-muted flex items-center justify-center flex-shrink-0">
              <Icon className={cn("w-5 h-5", colorClass)} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{file.size}</span>
                <span>•</span>
                <span>{file.modified}</span>
              </div>
            </div>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {file.starred && <Star className="w-4 h-4 text-accent fill-accent" />}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
          </div>
        );
      })}
    </div>
  );
};
