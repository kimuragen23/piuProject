export class createOrderCode {
    static getRandomString(): string {
        // 연월일(YYMMDD) 생성
        const today = new Date();
        const year = today.getFullYear().toString().slice(2);
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const dateStr = `${year}${createOrderCode.padStart(month.toString(), 2, '0')}${createOrderCode.padStart(day.toString(), 2, '0')}`;

        // 영문자 5자리(랜덤) 생성
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomStr = '';
        for (let i = 0; i < 5; i++) {
            randomStr += letters.charAt(Math.floor(Math.random() * letters.length));
        }

        return `${dateStr}${randomStr}`;
    }

    static padStart(str: string, len: number, padStr: string): string {
        if (str.length >= len) {
            return str;
        }

        return padStr.repeat(len - str.length) + str;
    }
}