import bcrypt from 'bcrypt';
import models from "../database/models/index";
import jwt from "jsonwebtoken";

export default{
    login: async (req, res) => {
        const { email, password } = req.body
        
        let user = await models.User.findOne({ //busca 1 objeto
            where: {email: email}
        })
        //si no existe
        if(!user) return res.status(401).json({message: "Credenciales Incorrectas"})

        //verificar la contraseña
        const correcto = await bcrypt.compare(password, user.password);

        if(correcto){
            //generar un token JWT
            
            const payload ={
                id: user.id,
                email: user.email,
                time: new Date()
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET || "MI_CODIGO_SECRETO_JWT", {
                expiresIn: 60*60
        })

           // const {contraseña, ...rest} = user

            return res.status(200).json({access_token: token, user: user, error: false})
        }

        return res.status(401).json({message: "Credenciales Incorrectas"})

    },
    
    registro: async (req, res) => {
        //CREAR REGISTRAR NUEVO USUARIO
        // /api/user/:nombre   | re.params.nombre
        // /api/user?q=juan    | req.query.q
        // /api/user           | req.headers
        // /api/user           | req.body
        console.log(req.body);

        //select * from users where email = re.body.email limit 1
        const { email, password } = req.body
        
        let user = await models.User.findOne({ //busca 1 objeto
            where: {email: email}
        })

        console.log(user)

        if(!user){
            //cifrar el password
            const hash = await bcrypt.hash(password, 12)
            //registrar al user
            user = await models.User.create({email, password: hash})//para optimizar codigo

            return res.status(201).json({mensaje: "Debes registrar usuario", data: user})
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