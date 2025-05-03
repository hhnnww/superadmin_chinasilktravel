import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/travelproduct/product')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/travelproduct/"!</div>
}
