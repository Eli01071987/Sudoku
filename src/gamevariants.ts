export interface IVariant {
    filling: string,
    answer: string,
    variant: number;
}

export class VariantService {

    private static storageKey = 'playedGames';

    private gameVariants: IVariant[] = [
        {
            filling: '050000000001005260600091003006980000703156804000073500900610008068400100000000040',
            answer: '354762981891345267672891453516984732723156894489273516945617328268439175137528649',
            variant: 1
        },
        {
            filling: '041309020085060030002040000090400001000806000800005040000050300060020980050903410',
            answer: '641389527985267134372541698597432861124896753836715249419658372763124985258973416',
            variant: 2
        },
        {
            filling: '600037008708000064000200170500010200002070600004050007095001000260000905300560002',
            answer: '619437528728195364453286179576918243982374651134652897895721436267843915341569782',
            variant: 3
        },
        {
            filling: '000004813830100000604080009000003001052000430300200000200060105000005024745800000',
            answer: '529674813837159642614382579478593261952716438361248957239467185186935724745821396',
            variant: 4
        },
        {
            filling: '200480710005020030040007002520706000000000000000305076900800020030070900082069001',
            answer: '296483715875621439143957862529746183367218594418395276951834627634172958782569341',
            variant: 5
        }
    ];

    public getVariant(): IVariant {
        const playedGames = this.getPlayedGames();

        const remainVariants = this.gameVariants.filter((item) => {
            return playedGames.indexOf(item.variant) === -1;
        });

        if (!remainVariants.length) {
            const variant = Math.floor(Math.random() * (this.gameVariants.length - 1));
            const gameVariant = this.gameVariants[variant];

            this.cleanPlayedGames();
            this.setPlayedGame(gameVariant.variant);

            return gameVariant;
        } else {
            const variant = Math.floor(Math.random() * (remainVariants.length - 1));
            const gameVariant = remainVariants[variant];

            this.setPlayedGame(gameVariant.variant);

            return gameVariant;
        }
    }

    private getPlayedGames(): number[] {
        const playedGames = localStorage.getItem(VariantService.storageKey);

        if (!playedGames) {
            localStorage.setItem(VariantService.storageKey, JSON.stringify([]));

            return [];
        }

        return JSON.parse(playedGames);
    }

    private setPlayedGame(playedGameVariant: number): void {
        const playedGames: number[] = JSON.parse(localStorage.getItem(VariantService.storageKey));
        playedGames.push(playedGameVariant);

        localStorage.setItem(VariantService.storageKey, JSON.stringify(playedGames));
    }

    private cleanPlayedGames(): void {
        localStorage.setItem(VariantService.storageKey, JSON.stringify([]));
    }
}
