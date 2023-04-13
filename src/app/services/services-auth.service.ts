import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import  firebase  from 'firebase/compat/app';
import { merge } from 'rxjs';

export interface User{
  uid:string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVarified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesAuthService {

  userState: any;

  constructor(
    public firestore:AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) { 
    /*Asegurarse que exista un usuario*/
    this.fireAuth.authState.subscribe((user)=>{
      if(user){
        this.userState = user;
        localStorage.setItem('user',JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user') as any);
      }
      else{
        localStorage.setItem('user',null!);
        JSON.parse(localStorage.getItem('user') as any);
      }

    });
  }

  // Método para login con usuario y contraseña
  login(email:string,password:string){
    return this.fireAuth.signInWithEmailAndPassword(email,password)
    .then((result)=>{
      this.ngZone.run(()=>{
        this.router.navigate(['home']);
      });
      this.setUserData(result.user);
    }).catch((error) =>{
      window.alert(error.message);
    });
  }

  //Metodo para registrarse con email y password
  registrar(email:string, password:string ){
    return this.fireAuth.createUserWithEmailAndPassword(email,password)
    .then((result)=>{
      this.sendVerificarMail();
      this.setUserData(result.user);
    })
    .catch((error)=>{
      window.alert(error.message);
    })
    }


  //Metodo para enviar email de verificación
  sendVerificarMail(){
    return this.fireAuth.currentUser.then(u => u?.sendEmailVerification())
    .then(()=>{
      this.router.navigate(['verificar-email']);
    })
  }

  //Metodo para cuando el usuario olvido su contraseña
  forgotPassword(passwordResetEmail: string){
    return this.fireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(()=>{
      window.alert('Se envio correo para restablecer la contraseña');
    })
    .catch((error)=>{
      window.alert(error.message);
    });
  }
  
  //Getter para cuando el usuario esta logeado
  get isLoggedIn():boolean{
    const user = JSON.parse(localStorage.getItem('user') as any);
    return (user != null && user.emailVerified != false) ? true : false;
  }

  //Metodo para autenticar con Google
  googleAuth(){
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  //Metood para logerarse con provedores (google, facebook, etc)
  authLogin(provider:any){
    return this.fireAuth.signInWithPopup(provider)
    .then((result)=>{
      this.ngZone.run(()=>{
        this.router.navigate(['home']);
      })
      this.setUserData(result.user);
    })
    .catch((error)=>{
      window.alert(error.message);
    })
  }

  setUserData(user:any){
    const userRef: AngularFirestoreDocument <any> =
    this.firestore.doc('users/${user.uid}');
    const userState: User = {
      uid: user.iud,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVarified: user.emailVarified
    }
    return userRef.set(userState,{merge:true})
  }

  //Metodo para cerrar sesion
  logout(){
    return this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['login'])
    })
  }
}
