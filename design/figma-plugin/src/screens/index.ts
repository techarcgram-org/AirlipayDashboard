import { A01SignIn, A02Overview, A03Profile } from './access';
import {
  B01Employees,
  B02NewEmployee,
  B03EmployeeProfile,
  B04MomoAccounts,
  B05Activity,
  B06BankAccounts,
  B07DebitCards,
  B08EditEmployee
} from './employees';
import {
  C01Clients,
  C02NewClient,
  C03ClientProfile,
  C04ClientRoster,
  C05ClientFunding,
  C06PaymentHistory,
  C07ClientPayouts,
  C08EditClient
} from './clients';
import {
  D01Team,
  D02InviteAdmin,
  D03AdminProfile,
  D04EditAdmin
} from './admins';
import { E01Transactions, E02Invoices, E03InvoiceDetail, E04PayoutRuns } from './finance';

export type ScreenBuilder = () => FrameNode;

export const BUILDERS: Record<string, ScreenBuilder> = {
  A01SignIn,
  A02Overview,
  A03Profile,
  B01Employees,
  B02NewEmployee,
  B03EmployeeProfile,
  B04MomoAccounts,
  B05Activity,
  B06BankAccounts,
  B07DebitCards,
  B08EditEmployee,
  C01Clients,
  C02NewClient,
  C03ClientProfile,
  C04ClientRoster,
  C05ClientFunding,
  C06PaymentHistory,
  C07ClientPayouts,
  C08EditClient,
  D01Team,
  D02InviteAdmin,
  D03AdminProfile,
  D04EditAdmin,
  E01Transactions,
  E02Invoices,
  E03InvoiceDetail,
  E04PayoutRuns
};

export { buildFoundationsPlate, FOUNDATIONS_PLATE_HEIGHT } from './foundations';
