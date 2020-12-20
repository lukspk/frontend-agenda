<template>
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Agenda</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active">Agenda</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="content">
      <div class="container-fluid">

        <b-modal v-model="modalShow" @ok.prevent="sendRequest">
          <template #modal-title>
            Cadastrar Novo Contato
          </template>
          <template #default>
            <b-form-group
                id="input-group-1"
                label="Nome:"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  type="text"
                  placeholder="Digite o nome do Contato"
                  v-model="form.name"
                  required
              ></b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label="E-mail:"
                label-for="input-2"
            >
              <b-form-input
                  id="input-2"
                  v-model="form.email"
                  type="email"
                  required
              ></b-form-input>
            </b-form-group>
            <b-row>
              <b-col>
                <b-form-group
                    id="input-group-3"
                    label="Sexo:"
                    label-for="input-3"
                >
                  <b-form-select id="input-3" v-model="form.sex" :options="[{value: 'M', text: 'Masculino'}, {value: 'F', text: 'Feminino'}]"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                    id="input-group-4"
                    label="Telefone:"
                    label-for="input-4"
                >
                  <b-form-input
                      id="input-4"
                      type="text"
                      v-mask="'(##) #####-####'"
                      v-model="form.phone"
                      required
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </template>
        </b-modal>
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <div class="card-title btn-group" style="margin-bottom: 0">
                      <h5>Contatos</h5>
                      <button type="button" class=" ml-3 btn btn-block btn-sm btn-primary" @click="showModal()" >Adicionar Contato</button>
                </div>
                <div class="card-tools">
                  <div class="input-group input-group-sm" style="width: 150px;">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Buscar">

                    <div class="input-group-append">
                      <button type="submit" class="btn btn-default">
                        <i class="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                  <tr>
                    <th>Ação</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Sexo</th>
                    <th>Email</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(contact, key) in contactList" :key="key">
                    <td>
                      <b-btn-group>
                        <b-button @click="showModal(contact.id)" size="sm" variant="primary">Editar <i class="fas fa-edit"></i></b-button>
                        <b-button @click="deleteContact(contact.id)" size="sm" variant="danger">Excluir <i class="fas fa-trash-alt"></i></b-button>
                      </b-btn-group>
                    </td>
                    <td> {{contact.name}} </td>
                    <td> {{contact.phone}} </td>
                    <td> {{contact.sex ==='M' ? 'Masculino' : 'Feminino'}} </td>
                    <td> {{contact.email}} </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import axios from "@/utils/axios";
import swal from "sweetalert";

export default {
  name: "Contacts",
  data() {
    return {
      modalShow:false,
      form: {
        sex: '',
        name: '',
        phone: '',
        email: '',
      },
      formProperties: {
        method: null,
        url: null
      },
      contactList: []
    }
  },
  methods: {
    showModal(id = null) {
      this.modalShow = true;
      if (id !== null) {
        axios.get(`/contacts/${id}`).then( ({ data }) => (
          this.changeValues(data.name, data.sex, data.phone, data.email)
        )).catch(error => console.log(error));
        this.changeForm('PUT',`/contacts/${id}`);
      } else {
        this.changeValues();
        this.changeForm('POST','/contacts/');
      }
    },
    changeValues(name = null, sex = null, phone = null, email = null) {
      this.form.sex = sex;
      this.form.name = name;
      this.form.phone = phone;
      this.form.email = email;
    },
    async sendRequest() {
      await axios({
        method: this.formProperties.method,
        url: this.formProperties.url,
        data: this.form
      }).then(() => {
        swal(`Contato ${this.formProperties.method === 'POST' ? 'Cadastrado' : 'Editado'} com Sucesso!`, {
          icon: "success",
        });
        this.modalShow = !this.modalShow;
        this.updateList();
      }).catch(() => {
        swal("Erro ao Cadastrar Contato!", {
          icon: "error",
        });
      });
    },
    async updateList() {
      await axios.get('/contacts/').then( ({ data }) => ( this.contactList = data )).catch(error => console.log(error));
    },
    changeForm(method, url) {
      this.formProperties = {method, url};
    },
    deleteContact(id) {
      swal({
        title: "Deseja Deletar Contato?",
        text: "Após deletado essa ação não poderá ser desfeita!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then( async (willDelete) => {
          if (willDelete) {
            await axios({
              method: 'DELETE',
              url: `/contacts/${id}`,
            })
            this.updateList();
            swal("Contato deletado com Sucesso!", {
              icon: "success",
            });
          }
        });
    }
  },
  mounted() {
    this.updateList();
  }
};
</script>

<style>
</style>
