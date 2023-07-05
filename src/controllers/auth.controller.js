import models from "../database/models/index";
export default{
    login: (req, res) => {

    },
    
    registro: (req, res) => {
        //CREAR REGISTRAR NUEVO USUARIO
        // /api/user/:nombre   | re.params.nombre
        // /api/user?q=juan    | req.query.q
        // /api/user           | req.headers
        // /api/user           | req.body

        const { email, password } = req.body
        const user = models.User.findOne({
            where: {email: email}
        })

        if(!user){

        }else {
            return res.status(422).json({mensaje: "El correo ya existe"})
        }

    },
    
    perfil: (req, res) => {
        return res.send("MI PERFIL")  
    },
    logout: (req, res) => {
    
    }
    
}