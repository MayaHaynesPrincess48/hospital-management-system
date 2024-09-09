import { NextFunction, Request, Response } from "express";
import AdminDoctorUseCase from "../../../use_case/admin/DoctorUseCase";
import { StatusCode } from "../../../types";
import { isValidEmail } from "../../validators/authValidators";

export default class AdminDoctorController {
   constructor(private doctorUseCase: AdminDoctorUseCase) {}
   
   async getDoctors(req: Request, res: Response, next: NextFunction) {
      try {
         const offset = parseInt(req.query.offset as string) || 0;
         const limit = parseInt(req.query.limit as string) || 10;
         const doctors = await this.doctorUseCase.getAll(offset, limit);
         res.status(StatusCode.Success).json(doctors);
      } catch (error) {
         next(error);
      }
   }
}
