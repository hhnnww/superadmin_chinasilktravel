import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/travelproduct/site')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/travelproduct/site"!</div>
}
