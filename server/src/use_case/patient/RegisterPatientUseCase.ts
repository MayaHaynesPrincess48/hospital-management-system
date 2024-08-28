import { IPatient } from "../../domain/entities/Patient";
import IPatientRepository from "../../interface/repositories/IPatientRepository";
import { IPasswordServiceRepository } from "../../interface/services/IPasswordServiceRepository";

export default class RegisterPatientUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private passwordService: IPasswordServiceRepository
   ) {}

   async execute(patient: IPatient) {
      patient.password = await this.passwordService.hash(patient.password!);
      const {_id} =await this.patientRepository.create(patient);
      return `New Patient with id ${_id} Created`
   }
}
