import { format, addMonths } from 'date-fns';

interface BankAccount {
  iban: string;
  bic: string;
  accountHolder: string;
  mandateReference: string;
  mandateDate: string;
}

interface PaymentInfo {
  amount: number;
  description: string;
  dueDate: string;
  isInstallment?: boolean;
  installmentNumber?: number;
  totalInstallments?: number;
  monthlyAmount?: number;
}

export function generateSEPAXML(
  creditorId: string,
  creditorName: string,
  creditorIBAN: string,
  creditorBIC: string,
  debtorAccount: BankAccount,
  payment: PaymentInfo
): string {
  const messageId = `MSG${Date.now()}`;
  const paymentId = `PMT${Date.now()}`;
  const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");

  // Determine sequence type based on installment number
  const sequenceType = payment.isInstallment 
    ? (payment.installmentNumber === 1 ? 'FRST' : 'RCUR')
    : 'OOFF';

  // For installments, we create a description that includes payment schedule
  const paymentDescription = payment.isInstallment
    ? `${payment.description} - Installment ${payment.installmentNumber}/${payment.totalInstallments}`
    : payment.description;

  return `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02">
  <CstmrDrctDbtInitn>
    <GrpHdr>
      <MsgId>${messageId}</MsgId>
      <CreDtTm>${currentDate}</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>${payment.monthlyAmount || payment.amount}</CtrlSum>
      <InitgPty>
        <Nm>${creditorName}</Nm>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>${paymentId}</PmtInfId>
      <PmtMtd>DD</PmtMtd>
      <BtchBookg>true</BtchBookg>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>${payment.monthlyAmount || payment.amount}</CtrlSum>
      <PmtTpInf>
        <SvcLvl>
          <Cd>SEPA</Cd>
        </SvcLvl>
        <LclInstrm>
          <Cd>CORE</Cd>
        </LclInstrm>
        <SeqTp>${sequenceType}</SeqTp>
      </PmtTpInf>
      <ReqdColltnDt>${payment.dueDate}</ReqdColltnDt>
      <Cdtr>
        <Nm>${creditorName}</Nm>
      </Cdtr>
      <CdtrAcct>
        <Id>
          <IBAN>${creditorIBAN}</IBAN>
        </Id>
      </CdtrAcct>
      <CdtrAgt>
        <FinInstnId>
          <BIC>${creditorBIC}</BIC>
        </FinInstnId>
      </CdtrAgt>
      <CdtrSchmeId>
        <Id>
          <PrvtId>
            <Othr>
              <Id>${creditorId}</Id>
              <SchmeNm>
                <Prtry>SEPA</Prtry>
              </SchmeNm>
            </Othr>
          </PrvtId>
        </Id>
      </CdtrSchmeId>
      <DrctDbtTxInf>
        <PmtId>
          <EndToEndId>${paymentId}</EndToEndId>
        </PmtId>
        <InstdAmt Ccy="EUR">${payment.monthlyAmount || payment.amount}</InstdAmt>
        <DrctDbtTx>
          <MndtRltdInf>
            <MndtId>${debtorAccount.mandateReference}</MndtId>
            <DtOfSgntr>${debtorAccount.mandateDate}</DtOfSgntr>
          </MndtRltdInf>
        </DrctDbtTx>
        <DbtrAgt>
          <FinInstnId>
            <BIC>${debtorAccount.bic}</BIC>
          </FinInstnId>
        </DbtrAgt>
        <Dbtr>
          <Nm>${debtorAccount.accountHolder}</Nm>
        </Dbtr>
        <DbtrAcct>
          <Id>
            <IBAN>${debtorAccount.iban}</IBAN>
          </Id>
        </DbtrAcct>
        <RmtInf>
          <Ustrd>${paymentDescription}</Ustrd>
        </RmtInf>
      </DrctDbtTxInf>
    </PmtInf>
  </CstmrDrctDbtInitn>
</Document>`;
}

// Utility function to download the generated XML file
export function downloadSEPAFile(xmlContent: string, filename: string = 'sepa-direct-debit.xml') {
  const blob = new Blob([xmlContent], { type: 'text/xml' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// Function to generate multiple SEPA XML files for installments
export function generateInstallmentSEPAXMLs(
  creditorId: string,
  creditorName: string,
  creditorIBAN: string,
  creditorBIC: string,
  debtorAccount: BankAccount,
  payment: Omit<PaymentInfo, 'installmentNumber'> & { totalInstallments: number }
): void {
  const monthlyAmount = payment.amount / payment.totalInstallments;

  // Generate SEPA XML for each installment
  for (let i = 1; i <= payment.totalInstallments; i++) {
    const installmentDueDate = format(
      addMonths(new Date(payment.dueDate), i - 1),
      'yyyy-MM-dd'
    );

    const installmentPayment: PaymentInfo = {
      ...payment,
      isInstallment: true,
      installmentNumber: i,
      monthlyAmount,
      dueDate: installmentDueDate,
    };

    const xmlContent = generateSEPAXML(
      creditorId,
      creditorName,
      creditorIBAN,
      creditorBIC,
      debtorAccount,
      installmentPayment
    );

    // Download each installment XML with a unique filename
    downloadSEPAFile(xmlContent, `sepa-direct-debit-${debtorAccount.mandateReference}-inst${i}.xml`);
  }
}