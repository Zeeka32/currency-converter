import classes from "./empty.module.css";

const Empty = ({ header, body }: { header: string; body: string }) => {
  return (
    <div className={classes.empty}>
      <h2 className={classes.header}>{header}</h2>
      <p className={classes.paragraph}>{body}</p>
    </div>
  );
};

export default Empty;
