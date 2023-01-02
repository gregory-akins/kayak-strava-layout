export function authenticate() {
  return true;
}
export interface Athlete {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
}

export interface ServiceConfig {
  stravaUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
}
export const getAthlete = async (accessToken: string): Promise<Athlete> => {
  console.log("Is the mock being fired");
  const user: Athlete = {
    firstname: "Greg",
    lastname: "Akins",
    username: "akinsgre",
    id: 123,
  } as Athlete;
  return new Promise((resolve, reject) => {
    resolve(user);
  });
};

export async function useServiceConfig(): Promise<ServiceConfig> {
  var promise = new Promise<ServiceConfig>((resolve, reject) => {
    const serviceConfig: ServiceConfig = {
      stravaUrl: "",
      clientId: "",
      clientSecret: "",
      redirectUrl: "",
    };
    resolve(serviceConfig);
  });
  return promise;
}
