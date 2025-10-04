import { ApprovalRulesForm } from "@/components/ApprovalRulesForm";
import { Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card shadow-[var(--shadow-card)]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Approval Rules</h1>
              <p className="text-sm text-muted-foreground">
                Configure user assignments and approval workflows
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <ApprovalRulesForm />
      </div>
    </div>
  );
};

export default Index;
