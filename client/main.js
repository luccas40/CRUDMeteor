import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Clientes } from '/lib/collections/cliente';
import { Session } from 'meteor/session';

import './main.html';

var me = this;

Template.formulario.helpers({
    clicli: function(){
		Meteor.subscribe('cliente.findByUser');
        return Clientes.find();
    }
});

Template.formulario.events({
	'click #new'(e){
		e.preventDefault();
		Session.set('selectedItem', null);
		me.$("#nome").val(null);
		me.$("#cpf").val(null);
		me.$("#rua").val(null);
		me.$("#numero").val(null);
		me.$("#complemento").val(null);
		me.$("#bairro").val(null);
		me.$("#cep").val(null);
		me.$("#cidade").val(null);
		me.$("#estado").val(null);
		me.$("#formularioCadCli").modal("show");
		
	},
	'click button[name=edit]'(e){
		e.preventDefault();
		Session.set("selectedItem", this._id);
		me.$("#nome").val(this.nome);
		me.$("#cpf").val(this.cpf);
		me.$("#rua").val(this.rua);
		me.$("#numero").val(this.numero);
		me.$("#complemento").val(this.complemento);
		me.$("#bairro").val(this.bairro);
		me.$("#cep").val(this.cep);
		me.$("#cidade").val(this.cidade);
		me.$("#estado").val(this.estado);
		me.$("#formularioCadCli").modal("show");
	},
	'submit #formCadCli'(e){
		e.preventDefault();
		var newCliente = {
			nome: e.target.nome.value,
			cpf: e.target.cpf.value,
			rua: e.target.rua.value,
			numero: e.target.numero.value,
			complemento: e.target.complemento.value,
			bairro: e.target.bairro.value,
			cep: e.target.cep.value,
			cidade: e.target.cidade.value,
			estado: e.target.estado.value
		}
		
		Meteor.call('cliente.save', newCliente, Session.get('selectedItem'), function(err, result){
			if(err){
			}else{
				me.$("#formularioCadCli").modal("toggle");				
			}			
		});
	},
	'click button[name=delete]'(e){
		e.preventDefault();
		const id = this._id;
		Meteor.call('cliente.delete', id);
	}
});


