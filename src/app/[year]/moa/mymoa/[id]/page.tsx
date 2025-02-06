export default async function MyMoaBoxPage({ params }) {
  const { id } = await params;
  return <>moaBox Id : {id}</>;
}
