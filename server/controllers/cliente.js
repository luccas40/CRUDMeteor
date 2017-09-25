import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Clientes } from '/lib/collections/cliente';

Meteor.methods(
	{'cliente.save'(cliente, id){
		check(cliente, {
			nome: String,
			cpf: String,
			rua: String,
			numero: String,
			complemento: String,
			bairro: String,
			cep: String,
			cidade: String,
			estado: String
		});		
	if(id == null){	
		Clientes.insert(cliente);
	}else{
		Clientes.update(id, {$set:cliente});
	}
	
	}
});

	Meteor.methods(
		{'cliente.delete'(id){
			check(id, String);		
			Clientes.remove(id);
		}
	});

	Meteor.methods(
		{'cliente.find'(id){
			check(id, String);
			return Clientes.findOne({_id: id});
		}
	});

	Meteor.publish('cliente.findByUser', function(){
			return Clientes.find();		
		}
	);