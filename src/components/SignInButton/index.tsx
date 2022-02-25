import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi';
import styles from './styles.module.scss';
// import {signIn, signOut, useSession} from 'next-auth/client'

export function SignInButton() {

  const userLogged = true;
  
  return userLogged ? (
    <button
      className={styles.signInButton}
      onClick={() => {}}
    >
      <FaGithub color="#04D361" />
      Johelder
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button 
      className={styles.signInButton}
      onClick={() => {}}
    >
      <FaGithub color="#EDA417" />
      Sign in with Github
    </button>
  );
}