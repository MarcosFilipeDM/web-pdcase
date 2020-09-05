import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  modalTitle: string;
  user: User = null;
  email = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<UserRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private msgService: ToastrService,
  ) { }

  ngOnInit() {
    this.user = this.data.user != null ? this.data.user : new User();
    this.modalTitle = this.data.user != null ? 'Editar Usuário':'Cadastrar Usuário';
  }

  save(){
    if(this.checkField()){
      this.user.email = this.email.value
      this.dialogRef.close(this.user);
    }
  }

  close(){
    this.dialogRef.close(null);
  }

  checkField(){
    if(this.user.name == '' || this.user.surName == '' || this.user.username == '' || this.user.password == ''){
      this.msgService.warning('Os campos com ** são obrigatórios.');
      return false;
    }else if(!this.email.valid){
      this.msgService.warning('Email invalido');
      return false;
    }else{
      return true;
    }
  }

  isEnabled(status){
    return status == true? 'Ativo':'Inativo';
  }
}
