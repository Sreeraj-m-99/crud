const express=require('express')

const employeeController=require('../controller/employeeController')

const router =express.Router()


router.post('/',employeeController.createEmployee)

router.get('/',employeeController.getAllEmployees)

router.get('/:id',employeeController.getEmployeeById)

router.put('/:id',employeeController.updateEmployeeById)

router.delete('/:id',employeeController.deleteEmployee)

module.exports=router