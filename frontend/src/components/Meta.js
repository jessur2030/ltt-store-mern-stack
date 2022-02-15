import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Linus Tech Tips Store",
  description: "Linus Tech Tips Store Merch Store",
  keywords: "clothing, buy electronics, gaming electronics",
};

export default Meta;
