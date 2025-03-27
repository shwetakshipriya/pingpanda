import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { DashboardPage } from "@/components/dashboard-page"
import{DashboardPageContent} from "./dashboard-page-content"

const Page = async () => {
  const auth = await currentUser()
  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    redirect("/sign-in")
  }
  return (
    <div>
    <DashboardPage title="Dashboard">
    DashboardPageContent
        </DashboardPage>
    </div>
  )
}
export default Page
