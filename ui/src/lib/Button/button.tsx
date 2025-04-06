import './button.module.scss';

export function Button() {
  return (
    <button>
      <img width="50px" height="50px" alt="logo" src="/assets/ui/logo.png" />
      Welcome to Button!
    </button>
    // <div className={styles['container']}>
    //   <h1>Welcome to Button!</h1>
    // </div>
  );
}

export default Button;
