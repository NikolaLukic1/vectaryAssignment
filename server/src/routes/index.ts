import express from 'express';
import { add } from './messageAdd';
import { get } from './messageGet';
import { getList } from './messageGetList';
import { deleteOne } from './messageDelete';
import { edit } from './messageUpdate';
import { BadRequestError, NotFoundError } from '../util/errors';

const router = express()

// middleware

// routes
router.use(get);
router.use(add);
router.use(getList);
router.use(deleteOne);
router.use(edit);

// 404 for not found endpoints
router.use((req,res)=>{
    res.status(404).json({
        code: 404,
        message: 'Not found.'
    })
})

router.use((err, req, res, next)=>{    
    console.log(err)
    if(err instanceof BadRequestError){
        return res.status(406).json({
            code: 406,
            message: err.message
        })
    }
    if(err instanceof NotFoundError){
        return res.status(404).json({
            code: 404,
            message: err.message
        })
    }

    res.status(500).json({
        code: 500,
        message: 'Internal server error.'
    })
})


// error handle
export default router;