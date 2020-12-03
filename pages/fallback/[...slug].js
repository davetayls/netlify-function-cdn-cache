import { getControl } from "../../lib/control";

export default function Test({ control, release }) {
  return (
    <div>
      <h1>{control}</h1>
      <p>Release {release}</p>
      <ul>
        <li><a href="./a">a</a></li>
        <li><a href="./b">b</a></li>
        <li><a href="./c">c</a></li>
      </ul>
    </div>
  )
}

export const getStaticPaths = () => ({
  paths: [],
  fallback: true
})

export const getStaticProps = ({ params }) => {
  const path = params.slug
    ? '/test/' + params.slug.join('/')
    : ''
  return {
    props: {
      control: getControl(path) || '',
      release: process.env.TEST_RELEASE || 0
    }
  }
}
