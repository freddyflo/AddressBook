  // custom service; value, service & factory
    .factory('contact', ['$resource', function ContactFactory($resource) {
    
         var Resource = $resource('http://localhost:3000/contacts/:id', {id: '@id'}, { update: {method: 'PUT'}});
        
        
//        
//        var contacts = [
//             {
//              name: 'Stephen Radford',
//              phone: '0123456789',
//              address: '123, Some Street\nLeicester\nLE1 2AB',
//              email: 'stephen@email.com',
//              website: 'stephenradford.me',
//              notes: ''
//            },
//            {
//              name: 'Declan Proud',
//              phone: '987654321',
//              address: '234, Some Street\nLeicester\nLE1 2AB',
//              email: 'declan@email.com',
//              website: 'declanproud.me',
//              notes: 'Some notes about the contact.'
//            }
//        ];
//        
       
        return {
            get: function() {
               // return contacts;
                return Resource.query();
            },
            find: function(id, success, error) {
               //  return contacts[index];
                return Resource.get({id: id}, success, error);
            },
            create: function() {
            return new Resource();
            },
            destroy: function(id) {
                Resource.delete({id: id});
            }    
    };
}])