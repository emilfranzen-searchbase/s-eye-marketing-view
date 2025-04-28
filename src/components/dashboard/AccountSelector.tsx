
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface Account {
  id: string;
  name: string;
  type: "client" | "agency";
}

interface AccountSelectorProps {
  language: "en" | "sv";
}

export function AccountSelector({ language }: AccountSelectorProps) {
  const [selectedAccount, setSelectedAccount] = useState<string>("personal");

  const content = {
    en: {
      selectAccount: "Select Account",
      personalAccount: "Personal Account",
      switchToAgency: "Switch to Agency View",
    },
    sv: {
      selectAccount: "Välj konto",
      personalAccount: "Personligt konto",
      switchToAgency: "Byt till byråvy",
    }
  };

  const currentContent = content[language];

  // Mock accounts - in real app, these would come from an API
  const accounts: Account[] = [
    { id: "personal", name: currentContent.personalAccount, type: "client" },
    { id: "agency1", name: "Agency 1", type: "agency" },
    { id: "agency2", name: "Agency 2", type: "agency" },
  ];

  return (
    <Select value={selectedAccount} onValueChange={setSelectedAccount}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={currentContent.selectAccount} />
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
