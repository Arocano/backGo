
import { pool} from '../db.js'

export const getCliente= async (req,res) =>{
  try {
    const [taxista]=await pool.query('SELECT * FROM clientes WHERE usuario=?',[req.params.usuario])
        
    if(taxista.length <= 0) return res.status(404).json({
        message:'No existe el cliente'
    })
    res.json(taxista[0]) 
  } catch (error) {
    return res.status(500).json({
        message:'Error del servidor'
    })
  }      
  
}


export const getClientes= async (req,res) =>{
    try {
        const [taxistas]=await pool.query('SELECT * FROM clientes')
        res.json(taxistas) 
    } catch (error) {
        return res.status(500).json({
            message:'Error del servidor'
        })
    }
    
}

export const createClientes=async (req,res) =>{
    const {usuario,contrasenia,nombre,apellido} = req.body
    try {
        
        const [taxista]=await pool.query('INSERT INTO clientes(usuario,contrasenia,nombre,apellido) VALUES (?,?,?,?)',
        [usuario,contrasenia,nombre,apellido])
        res.send({
            usuario,contrasenia,nombre,apellido
        }) 
    } catch (er) {
        return res.status(500).json({
            error:'no se pudo crear el cliente'
        })
    }

}
export const login=async (req,res) =>{
    const {contrasenia} = req.body
    try {
        const [taxista]=await pool.query('SELECT * FROM clientes WHERE usuario=? and contrasenia=?',[req.params.usuario,contrasenia])
        if(taxista.length <= 0) return res.status(404).json({
            error:'Usuario o contraseña incorrectos'
        })
        res.send({ usuario:req.params.usuario ,contrasenia}) 
      } catch (error) {
        return res.status(500).json({
            message:'Error del servidor'
        })
      }    
}


export const updateClientes=async (req,res) =>{
    const {contrasenia}=req.body
    const {usuario}=req.params
    try {
        const [result] =await pool.query('UPDATE clientes SET contrasenia=? WHERE usuario=?',[contrasenia,usuario])
        if(result.affectedRows===0)return res.status(404).json({
            message:'No existe el taxista'
        })
    
        const [taxista] =await pool.query('SELECT * FROM clientes WHERE usuario=?',[usuario])
        res.json(taxista[0])
    } catch (error) {
        return res.status(500).json({
            message:'Error del servidor'
        })
    }


}
export const deleteClientes= async (req,res) =>{
  try {
      
    const [result] =await pool.query('DELETE FROM clientes WHERE usuario=?',[req.params.usuario])
    if(result.affectedRows <= 0) return res.status(404).json({
        message:'No existe el cliente'
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
        message:'Error del servidor'
    })
  }
}