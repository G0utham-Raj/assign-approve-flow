import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Approver {
  id: string;
  name: string;
  required: boolean;
}

export const ApprovalRulesForm = () => {
  const [userName, setUserName] = useState("");
  const [manager, setManager] = useState("Sarah");
  const [isManagerApprover, setIsManagerApprover] = useState(false);
  const [approvalSequence, setApprovalSequence] = useState(false);
  const [minApprovalPercentage, setMinApprovalPercentage] = useState(50);
  const [approvers, setApprovers] = useState<Approver[]>([
    { id: "1", name: "John Doe", required: false },
    { id: "2", name: "Jane Smith", required: false },
  ]);
  const [newApproverName, setNewApproverName] = useState("");

  const handleAddApprover = () => {
    if (newApproverName.trim()) {
      setApprovers([
        ...approvers,
        {
          id: Date.now().toString(),
          name: newApproverName,
          required: false,
        },
      ]);
      setNewApproverName("");
    }
  };

  const handleRemoveApprover = (id: string) => {
    setApprovers(approvers.filter((approver) => approver.id !== id));
  };

  const handleToggleRequired = (id: string) => {
    setApprovers(
      approvers.map((approver) =>
        approver.id === id ? { ...approver, required: !approver.required } : approver
      )
    );
  };

  const handleSave = () => {
    toast({
      title: "Approval Rule Saved",
      description: `Rule for ${userName} has been successfully saved.`,
    });
  };

  const handleReset = () => {
    setUserName("");
    setManager("Sarah");
    setIsManagerApprover(false);
    setApprovalSequence(false);
    setMinApprovalPercentage(50);
    setApprovers([
      { id: "1", name: "John Doe", required: false },
      { id: "2", name: "Jane Smith", required: false },
    ]);
    setNewApproverName("");
    toast({
      title: "Form Reset",
      description: "All fields have been cleared.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>User & Manager Assignment</CardTitle>
          <CardDescription>Configure user and their assigned manager</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user">User</Label>
            <Input
              id="user"
              placeholder="e.g., marc"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manager">Manager</Label>
            <Select value={manager} onValueChange={setManager}>
              <SelectTrigger id="manager">
                <SelectValue placeholder="Select manager" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="Sarah">Sarah</SelectItem>
                <SelectItem value="Michael">Michael</SelectItem>
                <SelectItem value="Jennifer">Jennifer</SelectItem>
                <SelectItem value="David">David</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Approval Rules</CardTitle>
          <CardDescription>Define approval workflow and requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="manager-approver"
              checked={isManagerApprover}
              onCheckedChange={(checked) => setIsManagerApprover(checked as boolean)}
            />
            <Label
              htmlFor="manager-approver"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Is Manager an Approver?
            </Label>
          </div>

          <div className="space-y-3">
            <Label>Approvers</Label>
            <div className="space-y-2">
              {approvers.map((approver) => (
                <div
                  key={approver.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/30"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`required-${approver.id}`}
                      checked={approver.required}
                      onCheckedChange={() => handleToggleRequired(approver.id)}
                    />
                    <Label
                      htmlFor={`required-${approver.id}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {approver.name}
                    </Label>
                    {approver.required && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveApprover(approver.id)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add approver name"
                value={newApproverName}
                onChange={(e) => setNewApproverName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddApprover()}
              />
              <Button onClick={handleAddApprover} size="sm" variant="secondary">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="approval-sequence"
              checked={approvalSequence}
              onCheckedChange={(checked) => setApprovalSequence(checked as boolean)}
            />
            <Label
              htmlFor="approval-sequence"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Approval Sequence
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="min-approval">Minimum Approval Percentage</Label>
            <div className="flex items-center gap-3">
              <Input
                id="min-approval"
                type="number"
                min="0"
                max="100"
                value={minApprovalPercentage}
                onChange={(e) => setMinApprovalPercentage(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleSave}>Save Rule</Button>
      </div>
    </div>
  );
};
