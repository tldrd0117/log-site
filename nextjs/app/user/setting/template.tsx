import { BorderBox } from "@/components/Box/BorderBox";
import { ContentsLayout } from "@/containers/layout/ContentsLayout";
import { PageLayout } from "@/containers/layout/PageLayout";
import { AppBarContentsTemplate } from "@/templates/AppBarContentsTemplate";

export default function Template({ children }: { children: React.ReactNode }) {
  return <>
        <AppBarContentsTemplate>
            {children}
        </AppBarContentsTemplate>
    </>
}