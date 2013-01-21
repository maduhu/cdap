package CountOddAndEven;

import com.continuuity.api.flow.flowlet.SinkFlowlet;
import com.continuuity.api.flow.flowlet.StreamsConfigurator;
import com.continuuity.api.flow.flowlet.Tuple;
import com.continuuity.api.flow.flowlet.TupleContext;
import com.continuuity.api.flow.flowlet.TupleSchema;
import com.continuuity.api.flow.flowlet.builders.TupleSchemaBuilder;

/**
 * Counts number of Odd tuples.
 */
public class OddCounter extends SinkFlowlet {
  private int count = 0;

  @Override
  public void consume(final Tuple tuple, final TupleContext context) {
    count++;
  }

  @Override
  public void configure(final StreamsConfigurator configurator) {
    TupleSchema schema = new TupleSchemaBuilder().add("number", Integer.class).create();
    configurator.getDefaultTupleInputStream().setSchema(schema);
  }
}
