import { BILL_STORAGE_KEY } from '../constants/storageKey';
import BaseService from './baseService';

class BillService extends BaseService {
  constructor () {
    super(BILL_STORAGE_KEY);
  }

  async getLocalStorageData () {
    let data = [];
    const storedData = this.getLocalStorage();
    if (storedData) {
      data = JSON.parse(storedData);
    }
    return data;
  }

  clearBillLocalStorage () {
    localStorage.removeItem(BILL_STORAGE_KEY);
  }
}
export default BillService
