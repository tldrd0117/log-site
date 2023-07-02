import { BorderBox } from "@/components/Box/BorderBox";
import { ContentsLayout } from "@/containers/layout/ContentsLayout";
import { PageLayout } from "@/containers/layout/PageLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageLayout className="flex justify-center items-center">
        <ContentsLayout tagType={BorderBox} className='w-96'>
            {children}
        </ContentsLayout>
    </PageLayout>
}