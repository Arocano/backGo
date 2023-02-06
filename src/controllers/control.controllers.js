import { pool} from '../db.js'

export const getControl= async (req,res) =>{
    const {taxista} = req.body
  try {
    const [control]=await pool.query('SELECT * FROM control_taxistas WHERE taxista=? AND id=?',[taxista,req.params.id])
        
    if(control.length <= 0) return res.status(404).json({
        message:'No existe el taxista'
    })
    res.json(control[0]) 
  } catch (error) {
    return res.status(500).json({
        message:'Error del servidor'
    })
  }      
  
}


export const getControles= async (req,res) =>{
    try {
        const [taxistas]=await pool.query('SELECT * FROM control_taxistas')
        res.json(taxistas) 
    } catch (error) {
        return res.status(500).json({
            message:'Error del servidor'
        })
    }
    
}

export const createControl=async (req,res) =>{
    const {taxista,hora_entrada} = req.body
    try {
        
        const [control]=await pool.query('INSERT INTO control_taxistas(taxista,hora_entrada) VALUES (?,?)',
        [taxista,hora_entrada])
        res.send({
            taxista,hora_entrada
        }) 
    } catch (er) {
        return res.status(500).json({
            error:er
        })
    }

}


export const updateControl=async (req,res) =>{
    const {hora_salida,taxista}=req.body
    try {
        const [result] =await pool.query('UPDATE control_taxistas SET hora_salida=? WHERE taxista=? AND id=? AND hora_salida IS NULL',[hora_salida,taxista,req.params.id])
        if(result.affectedRows===0)return res.status(404).json({
            message:'No existe el taxista'
        })
    
        const [control] =await pool.query('SELECT * FROM control_taxistas WHERE taxista=? AND id=?',[taxista,req.params.id])
        res.json(control[0])
    } catch (error) {
        return res.status(500).json({
            message:error
        })
    }


}
export const deleteControl= async (req,res) =>{
  try {
      
    const [result] =await pool.query('DELETE FROM control_taxistas WHERE usuario=?',[req.params.usuario])
    if(result.affectedRows <= 0) return res.status(404).json({
        message:'No existe el taxista'
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
        message:'Error del servidor'
    })
  }
}