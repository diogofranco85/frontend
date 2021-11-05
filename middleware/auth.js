
  export default function(props){
    const {store, redirect} = props;

    if(store.state.Auth.auth === false){
      redirect('/login');
    }
  }
