"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { useI18n } from "@/lib/i18n/locale-provider"
import { verifications } from "@/lib/data"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, FileText, User, Check, X } from "lucide-react"
import { toast } from "sonner"

export default function AdminVerificationPage() {
  const { t } = useI18n()

  return (
    <PortalShell portal="admin" titleKey="adm.verification" subtitleKey="adm.verificationSub">
      <div className="flex flex-col gap-6">
        <PageHeader titleKey="adm.verification" subtitleKey="adm.verificationSub" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verifications.map((v) => (
            <Card key={v.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Building2 className="size-5" />
                    </span>
                    <CardTitle className="text-base">{v.company}</CardTitle>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {t(`role.${v.role}` as never)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="size-4" />
                  <span>{v.applicant}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="size-4" />
                  <span>
                    {v.documents} {t("adm.documents")}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{v.submitted}</div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => toast.success(`${v.company}: ${t("adm.approved")}`)}
                >
                  <Check data-icon="inline-start" />
                  {t("adm.approve")}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => toast.error(`${v.company}: ${t("adm.reject")}`)}
                >
                  <X data-icon="inline-start" />
                  {t("adm.reject")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PortalShell>
  )
}
