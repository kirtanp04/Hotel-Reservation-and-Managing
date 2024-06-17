import { ProjectResponse } from './Response';

export class Convert {
    static toString = (value: any): ProjectResponse => {
        let _res: ProjectResponse = new ProjectResponse();
        try {
            const stringData: string = JSON.stringify(value);

            if (stringData) {
                _res.data = stringData;
            } else {
                _res.error = 'Server Error: Error While Converting to String';
            }
        } catch (error: any) {
            _res.error = error;
        } finally {
            return _res;
        }
    };

    static toParse = (value: string): ProjectResponse => {
        let _res: ProjectResponse = new ProjectResponse();
        try {
            const parseData = JSON.parse(value);

            if (parseData) {
                _res.data = parseData;
            } else {
                _res.error = 'Server Error: Not able to Parse Value';
            }
        } catch (error: any) {
            _res.error = error;
        } finally {
            return _res;
        }
    };
}
