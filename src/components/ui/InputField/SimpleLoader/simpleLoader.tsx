import classes from "./simpleLoader.module.css";

const SimpleLoader = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loader}></div>
    </div>
  );
};

export default SimpleLoader;
